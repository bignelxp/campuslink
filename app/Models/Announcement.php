<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    protected $fillable= [
        'id',
        'title',
        'content',	
        'type',	
        'target_audience',	
        'created_by',	
        'related_file_id',
        'related_user_id',	
        'created_at',	
        'updated_at',

    ];
public function file()
{
    return $this->belongsTo(Fichier::class, 'related_file_id');
}

public function auteur()
{
    return $this->belongsTo(User::class, 'created_by');
}


}
