<?php

namespace App\Http\Controllers;

use App\Events\ChatMessageEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    /**
     * @return void
     */
    public function create(Request $request)
    {
        if (auth()->check()) {
            ChatMessageEvent::dispatch(auth()->user()->name, $request['message'], date("H:i:s"));
        } else {
            ChatMessageEvent::dispatch('Anonymous', $request['message'], date("H:i:s"));
        }
    }
}
