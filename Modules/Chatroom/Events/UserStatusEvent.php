<?php

namespace Modules\Chatroom\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class UserStatusEvent implements ShouldBroadcast
{
    use SerializesModels,Dispatchable,InteractsWithSockets;

     public $data;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($data)
    {

        $this->data= $data;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return new Channel('user-online-channel');
    }
}
