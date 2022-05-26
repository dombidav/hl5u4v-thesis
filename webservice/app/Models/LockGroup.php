<?php

namespace App\Models;

use App\Traits\ApiResource;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property Collection<Lock> $locks
 */
class LockGroup extends Model
{
    use HasFactory;
    use ApiResource;

    protected $fillable = [
        'name',
    ];

    public function locks(){
        return $this->belongsToMany(Lock::class);
    }

    public function rules(){
        return $this->belongsToMany(AccessRule::class);
    }
}
