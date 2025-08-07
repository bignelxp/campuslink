<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fichier_filiere', function (Blueprint $table) {
            $table->id();
            $table->dateTime('datesoumission');
            $table->unsignedBigInteger('filiere_id')->nullable();
            $table->foreign('filiere_id')->references('id')->on('filieres')->onDelete('cascade');
            $table->unsignedBigInteger('fichier_id')->nullable();
            $table->foreign('fichier_id')->references('id')->on('fichiers')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fichier_filiere');
    }
};
