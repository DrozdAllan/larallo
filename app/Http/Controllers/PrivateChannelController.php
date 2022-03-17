<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PrivateChannelController extends Controller
{
    /**
     * @param Request $request
     * @return void
     */
    public function createChannel(Request $request)
    {
        $channelName = $request['channelName'];
        dd($channelName);
    }
}
