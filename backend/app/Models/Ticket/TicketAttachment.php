<?php

namespace App\Models\Ticket;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class TicketAttachment extends Model
{
    use HasFactory, HasApiTokens, Notifiable;

    protected $fillable = [
        'ticket_id',
        'file_path',
        'file_type',
    ];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
}
