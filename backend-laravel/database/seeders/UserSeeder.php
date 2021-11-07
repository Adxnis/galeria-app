<?php

namespace Database\Seeders;

use App\Models\Photo;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory(30)->create()->each(
            fn (User $user) => Photo::factory(random_int(1,10))->create(['user_id' => $user->id])
        );

        User::factory()->create([
            'username' => 'admin',
            'first_name' => 'admin',
            'last_name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => 'password'
        ]);

          // Order::factory(30)->create()->each(fn (Order $order) =>
        //     OrderItem::factory(random_int(1,5))->create(['order_id' => $order->id])
        // );
    }
}
