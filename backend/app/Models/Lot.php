<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Lot extends Model
{
    use HasFactory;

    protected $fillable = [
        'photo',
        'title',
        'price',
        'status',
    ];

    protected $hidden = ['created_at', 'updated_at'];

    protected $appends = ['photo_url'];



    public function getPhotoUrlAttribute()
    {
        if ($this->photo && \Storage::disk('public')->exists($this->photo)) {
            // return asset('storage/' . $this->photo);
            return Storage::disk('public')->url($this->photo);
        }

        return $this->photo;
    }

    protected static function booted()
    {
        static::deleting(function ($lot) {
            if ($lot->photo && Storage::disk('public')->exists($lot->photo)) {
                Storage::disk('public')->delete($lot->photo);
            }
        });
    }
}
