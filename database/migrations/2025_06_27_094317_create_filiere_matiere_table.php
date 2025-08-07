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
        Schema::create('filiere_matiere', function (Blueprint $table) {
            $table->id();
            $table->string('nom_prof');
            $table->unsignedBigInteger('filiere_id')->nullable();
            $table->foreign('filiere_id')->references('id')->on('filieres')->onDelete('cascade');
            $table->unsignedBigInteger('matiere_id')->nullable();
            $table->foreign('matiere_id')->references('id')->on('matieres')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('filiere_matiere');
    }
};
