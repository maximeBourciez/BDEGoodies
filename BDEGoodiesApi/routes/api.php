<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers;

Route::apiResource('etudiants', Controllers\EtudiantsController::class);
Route::apiResource('evenements', Controllers\EvenementsController::class);
Route::apiResource('reservations', Controllers\ReservationsController::class);