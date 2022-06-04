<?php

namespace App\Providers;

use App\Models\AccessRule;
use Exception;
use Illuminate\Support\Carbon;
use Illuminate\Support\ServiceProvider;

class AccessRuleProvider extends ServiceProvider
{

    /**
     * @throws Exception
     */
    public static function DoesRuleAllows(null|object|array $definition, AccessRule $rule): bool
    {
        if(!is_object($definition)){
            if(!is_array($definition)){
                throw new Exception('Definition must be an object or an array');
            }
            $definition = (object)$definition;
        }

        if(!isset($definition->from)) {
            $definition->from = Carbon::now()->setTime(0, 0);
        } else {
            $definition->from = Carbon::parse($definition->from);
        }

        if(!isset($definition->until)) {
            $definition->until = Carbon::now()->setTime(23, 59, 59);
        } else {
            $definition->until = Carbon::parse($definition->until);
        }

        if(isset($definition->onDays)) {
            if(in_array(Carbon::now()->dayOfWeekIso, $definition->onDays) && Carbon::now()->between($definition->from, $definition->until)) {
                return  $definition->action === 'allow';
            }
        }

        if(isset($definition->on) && Carbon::createFromFormat('Y-m-d', $definition->on)->isToday()){
            if(Carbon::now()->between($definition->from, $definition->until)){
                return $definition->action === 'allow';
            }
        }

        return false;
    }

    public function register()
    {
        //
    }

    public function boot()
    {
        //
    }
}
