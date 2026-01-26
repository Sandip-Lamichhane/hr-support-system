<?php

namespace App\Models\Ticket;

use App\Models\category;
use App\Models\Department;
use App\Models\Ticket\TicketAttachment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Ticket extends Model
{

    use HasFactory, HasApiTokens, Notifiable;

    protected $fillable = [
        'ticket_number',
        'title',
        'description',
        'priority',
        'category_id',
        'department_id',
        'due_date',
        'assigned_to',
        'status',
        'created_by'
    ];

    public function attachments()
    {
        return $this->hasMany(TicketAttachment::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function category()
    {
        return $this->belongsTo(category::class);
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
