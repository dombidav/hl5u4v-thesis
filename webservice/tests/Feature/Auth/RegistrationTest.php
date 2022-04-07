<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{

    public function test_new_users_can_register()
    {
        $response = $this->post('api/auth/signup', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertOk();
        $response->assertJsonStructure([
                                           'message', 'user' => ['name', 'email', 'id', 'created_at', 'updated_at']
                                       ]);
    }
}
