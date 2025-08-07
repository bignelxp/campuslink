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
        Schema::create('matieres', function (Blueprint $table) {
            $table->id();
            $table->string('nom_mat');
            $table->string('description_mat');
            $table->unsignedBigInteger('ue_id')->nullable();
            $table->foreign('ue_id')->references('id')->on('unite_enseignements')->onDelete('cascade');
            $table->unsignedBigInteger('semestre_id')->nullable();
            $table->foreign('semestre_id')->references('id')->on('semestres')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matieres');
    }
};
