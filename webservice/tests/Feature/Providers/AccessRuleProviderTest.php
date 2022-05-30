<?php

namespace Providers;

use App\Models\AccessRule;
use App\Providers\AccessRuleProvider;
use Carbon\Carbon;
use Tests\TestCase;

class AccessRuleProviderTest extends TestCase
{

    public function testGenericRuleShouldAllow()
    {
        $definiton = (object)[
            'onDays' => [ Carbon::now()->dayOfWeekIso ],
            'from' => Carbon::now()->setTime(3, 0),
            'until' => Carbon::now()->setTime(23, 0),
            'action' => 'allow'
        ];

        $this->assertTrue(AccessRuleProvider::DoesRuleAllows($definiton, new AccessRule()));
    }

    public function testGenericRuleShouldForbidTime()
    {
        $definiton = (object)[
            'onDays' => [ Carbon::now()->dayOfWeekIso ],
            'from' => Carbon::now()->setTime(22, 0),
            'until' => Carbon::now()->setTime(23, 0),
            'action' => 'allow'
        ];

        $this->assertFalse(AccessRuleProvider::DoesRuleAllows($definiton, new AccessRule()));
    }

    public function testGenericRuleShouldForbidDay()
    {
        $definiton = (object)[
            'onDays' => [ Carbon::now()->dayOfWeekIso + 1 ],
            'from' => Carbon::now()->setTime(3, 0),
            'until' => Carbon::now()->setTime(23, 0),
            'action' => 'allow'
        ];

        $this->assertFalse(AccessRuleProvider::DoesRuleAllows($definiton, new AccessRule()));
    }

    public function testSpecificRuleShouldAllow()
    {
        $definiton = (object)[
            'on' => Carbon::now()->format('Y-m-d'),
            'from' => Carbon::now()->setTime(3, 0),
            'until' => Carbon::now()->setTime(23, 0),
            'action' => 'allow'
        ];

        $this->assertTrue(AccessRuleProvider::DoesRuleAllows($definiton, new AccessRule()));
    }

    public function testSpecificRuleShouldForbidTime()
    {
        $definiton = (object)[
            'on' => Carbon::now()->format('Y-m-d'),
            'from' => Carbon::now()->setTime(22, 0),
            'until' => Carbon::now()->setTime(23, 0),
            'action' => 'allow'
        ];

        $this->assertFalse(AccessRuleProvider::DoesRuleAllows($definiton, new AccessRule()));
    }

    public function testSpecificRuleShouldForbidDay()
    {
        $definiton = (object)[
            'on' => Carbon::now()->addDay()->format('Y-m-d'),
            'from' => Carbon::now()->setTime(3, 0),
            'until' => Carbon::now()->setTime(23, 0),
            'action' => 'allow'
        ];

        $this->assertFalse(AccessRuleProvider::DoesRuleAllows($definiton, new AccessRule()));
    }
}
