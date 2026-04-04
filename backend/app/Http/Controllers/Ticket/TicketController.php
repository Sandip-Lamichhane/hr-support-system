<?php

namespace App\Http\Controllers\Ticket;

use App\Http\Controllers\Controller;
use App\Models\Ticket\Ticket;
use App\Models\Ticket\TicketAttachment;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class TicketController extends Controller
{

    public function GetTickets(Request $request)
    {
        $query = Ticket::with([
            'category:id,name',
            'department:id,name',
            'assignee:id,name',
            'creator:id,name',
            'attachments:id,ticket_id,file_path,file_type',
        ]);

        // Filters
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('department_id')) {
            $query->where('department_id', $request->department_id);
        }

        if ($request->filled('assigned_to')) {
            $query->where('assigned_to', $request->assigned_to);
        }

        // Search (title / ticket number)
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                    ->orWhere('ticket_number', 'like', '%' . $request->search . '%');
            });
        }

        //  Pagination
        $perPage = $request->get('per_page', 10);

        $tickets = $query
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return response()->json($tickets);
    }

    public function StoreTicket(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'priority' => 'required|in:low,medium,high,critical',
            'category_id' => 'required|exists:categories,id',
            'department_id' => 'required|exists:departments,id',
            'due_date' => 'nullable|date',
            'assigned_to' => 'nullable|exists:users,id',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|mimes:jpg,jpeg,png|max:2048',
        ]);

        $ticket = DB::transaction(function () use ($validated, $request) {
            $ticket = Ticket::create([
                'ticket_number' => 'TCK-' . now()->format('YmdHis'),
                'title' => $validated['title'],
                'description' => $validated['description'],
                'priority' => $validated['priority'],
                'category_id' => $validated['category_id'],
                'department_id' => $validated['department_id'],
                'due_date' => $validated['due_date'] ?? null,
                'assigned_to' => $validated['assigned_to'] ?? null,
                'created_by' => $request->user()->id,
            ]);

            if ($request->hasFile('attachments')) {
                foreach ($request->file('attachments') as $file) {
                    // Stores in storage/app/public/tickets
                    $path = $file->store('tickets', 'public');

                    TicketAttachment::create([
                        'ticket_id' => $ticket->id,
                        'file_path' => $path,
                        'file_type' => $file->getClientMimeType(),
                    ]);
                }
            }

            return $ticket;
        });

        return response()->json([
            'message' => 'Ticket created successfully',
            'ticket' => $ticket // Good to return the object for UI updates
        ], 201);
    }

    public function UpdateTicket(Request $request, $ticketNumber)
    {
        $ticket = Ticket::where('ticket_number', $ticketNumber)->first();
        if (!$ticket) {
            return response()->json(['message' => 'Ticket not found'], 404);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'priority' => 'required|in:low,medium,high,critical',
            'category_id' => 'required|exists:categories,id',
            'department_id' => 'required|exists:departments,id',
            'due_date' => 'nullable|date',
            'assigned_to' => 'nullable|exists:users,id',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|mimes:jpg,jpeg,png|max:2048',
        ]);

        try {
            $updateData = [
                'title' => $validated['title'],
                'description' => $validated['description'],
                'priority' => $validated['priority'],
                'category_id' => $validated['category_id'],
                'department_id' => $validated['department_id'],
            ];

            // Only update date fields if they're not empty
            if (!empty($validated['due_date'])) {
                $updateData['due_date'] = $validated['due_date'];
            }
            
            if (!empty($validated['assigned_to'])) {
                $updateData['assigned_to'] = $validated['assigned_to'];
            }

            $ticket->update($updateData);

            // Handle new file attachments
            if ($request->hasFile('attachments')) {
                foreach ($request->file('attachments') as $file) {
                    $path = $file->store('tickets', 'public');
                    TicketAttachment::create([
                        'ticket_id' => $ticket->id,
                        'file_path' => $path,
                        'file_type' => $file->getClientMimeType(),
                    ]);
                }
            }

            return response()->json([
                'message' => 'Ticket updated successfully',
                'ticket' => $ticket->load(['category:id,name', 'department:id,name', 'assignee:id,name', 'creator:id,name', 'attachments:id,ticket_id,file_path,file_type'])
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating ticket',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function AssignTicket(Request $request, $ticketNumber)
    {
        $ticket = Ticket::where('ticket_number', $ticketNumber)->first();
        if (!$ticket) {
            return response()->json(['message' => 'Ticket not found'], 404);
        }

        $validated = $request->validate([
            'assigned_to' => 'required|exists:users,id',
        ]);

        try {
            $ticket->update([
                'assigned_to' => $validated['assigned_to'],
            ]);

            return response()->json([
                'message' => 'Ticket assigned successfully',
                'ticket' => $ticket->load(['assignee:id,name', 'category:id,name', 'department:id,name'])
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error assigning ticket',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function GetTicket($ticketNumber)
    {
        $ticket = Ticket::where('ticket_number', $ticketNumber)->first();
        if (!$ticket) {
            return response()->json(['message' => 'Ticket not found'], 404);
        }
        return response()->json($ticket->load([
            'category:id,name',
            'department:id,name',
            'assignee:id,name',
            'creator:id,name',
            'attachments:id,ticket_id,file_path,file_type',
        ]));
    }
}