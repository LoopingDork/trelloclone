<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cards extends Model
{
    use HasFactory;
    protected $fillable = [
        'cardtitle',
        'order_id',
        'description',
        'order',
        'label',
        'list_id',
        'due_date'
    ];
}
