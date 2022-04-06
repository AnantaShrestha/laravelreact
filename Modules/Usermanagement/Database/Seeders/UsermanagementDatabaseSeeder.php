<?php

namespace Modules\Usermanagement\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class UsermanagementDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        \DB::connection('mysql')->table('users')->insert(
            [
                ['id' => '1','username' =>'admin','phone_no'=>'9861898666','password' =>bcrypt('admin123'), 'email' => 'ianantashrestha@gmail.com', 'name' => 'Administrator', 'created_at' => date('Y-m-d H:i:s')],
            ]
        );
    }
}
