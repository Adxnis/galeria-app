<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActivityLogTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activity_log', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            // $table->unsignedBigInteger('comment_id');
            // $table->unsignedBigInteger('like_id');
            $table->timestamps();


            $table->foreign('user_id')->references('id')->on('user')->onDelete('cascade');

            // $table->foreign('comment_id')->references('id')->on('comment')->onDelete('cascade');

            // $table->foreign('like_id')->references('id')->on('like_photo')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('activity_log');
    }
}
