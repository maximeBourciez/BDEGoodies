<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers;

Route::apiResource('etudiants', Controllers\EtudiantsController::class);
Route::apiResource('evenements', Controllers\EvenementsController::class);
Route::apiResource('reservations', Controllers\ReservationsController::class);
Route::apiResource('goodies', Controllers\GoodiesController::class);
Route::get('/evenements/{id}/etudiants', [Controllers\EvenementsController::class, 'getEtudiantsInscrits']);
Route::post('/reservations/goodies', [Controllers\ReservationGoodiesController::class, 'reserveGoodies']);
Route::get('/evenements/{id}/reservations', [Controllers\EvenementsController::class, 'getReservationsWithEtudiants']);