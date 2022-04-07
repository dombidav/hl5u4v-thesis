<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{

    public function test_users_can_authenticate_using_the_login_screen()
    {
        $response = $this->post('api/auth/signin', [
            'email' => 'supervisor@acs.test',
            'password' => 'secret',
        ]);

        $response->assertOk();
        $response->assertJsonStructure([
                                           'access_token',
                                           'token_type',
                                           'expires_in',
                                           'user' => [
                                               'id',
                                               'name',
                                               'email',
                                               'email_verified_at',
                                               'created_at',
                                               'updated_at',
                                           ],
                                       ]);
    }

    public function test_users_can_not_authenticate_with_invalid_password()
    {
        $user = User::factory()->create();

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }
}
