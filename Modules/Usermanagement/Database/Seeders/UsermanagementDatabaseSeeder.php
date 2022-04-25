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
    public $adminPassword = '$2y$10$JcmAHe5eUZ2rS0jU1GWr/.xhwCnh2RU13qwjTPcqfmtZXjZxcryPO';
    public function run()
    {
        Model::unguard();
        //users
        \DB::connection('mysql')->table('users')->insert(
            [
                ['id' => '1', 'username' =>'admin','phone_no'=>'9861898666','password' => $this->adminPassword, 'email' => 'ianantashrestha@gmail.com', 'name' => 'Administrator', 'created_at' => date('Y-m-d H:i:s')],
                ['id' => '2', 'username' =>'test','phone_no'=>'','password' => $this->adminPassword, 'email' => 'test@gmail.com', 'name' => 'Test User', 'created_at' => date('Y-m-d H:i:s')],

            ]
        );
        //permissions
        \DB::statement("INSERT INTO `permissions` (`id`, `name`, `slug`, `access_uri`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
                        (1, 'Full Control', 'full-control', 'api/admin/*', 1, NULL, '2022-04-19 00:19:22', '2022-04-19 00:19:22'),
                        (2, 'Permission Control', 'permission-control', 'api/admin/permission/*', 1, NULL, '2022-04-19 00:19:33', '2022-04-19 00:19:33'),
                        (3, 'Role Control', 'role-control', 'api/admin/role/*', 1, 1, '2022-04-19 00:19:52', '2022-04-19 00:20:27'),
                        (4, 'User Control', 'user-control', 'api/admin/user/*', 1, 1, '2022-04-19 00:20:02', '2022-04-19 00:20:35')");
        //roles
       \DB::statement("INSERT INTO `roles` (`id`, `name`, `slug`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
                        (1, 'Administrator', 'administrator', 1, NULL, '2022-04-19 03:07:29', '2022-04-19 03:07:29'),
                        (2, 'User Management', 'user-management', 1, NULL, '2022-04-19 03:08:18', '2022-04-19 03:08:18')");
        //role permissions pivot table
        \DB::statement("INSERT INTO `roles_permissions` (`id`, `role_id`, `permission_id`, `created_at`, `updated_at`) VALUES
                        (1, 1, 1, NULL, NULL),
                        (2, 2, 4, NULL, NULL),
                        (3, 2, 3, NULL, NULL),
                        (4, 2, 2, NULL, NULL)");

        //user role pivot table
        \DB::statement("INSERT INTO `users_roles` (`id`, `role_id`, `user_id`, `created_at`, `updated_at`) VALUES (1, 1, 1, NULL, NULL)");
    }
}
