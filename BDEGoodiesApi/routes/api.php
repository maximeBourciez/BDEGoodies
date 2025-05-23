<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers;


// Ressources CRUD
Route::apiResource('etudiants', Controllers\EtudiantsController::class);
Route::apiResource('evenements', Controllers\EvenementsController::class);
Route::apiResource('reservations', Controllers\ReservationsController::class);
Route::apiResource('goodies', Controllers\GoodiesController::class);

// Routes particulières
Route::get('/evenements/{id}/etudiants', [Controllers\EvenementsController::class, 'getEtudiantsInscrits']);
Route::post('/reservations/goodies', [Controllers\ReservationGoodiesController::class, 'reserveGoodies']);
Route::get('/evenements/{id}/reservations', [Controllers\EvenementsController::class, 'getReservationsWithEtudiants']);
Route::get('/prochains-evenements', [Controllers\EvenementsController::class, 'getProchainsEvenements']);
Route::get('/dernieres-reservations', [Controllers\ReservationsController::class, 'getDernieresReservations']);
Route::get('/petits-stocks', [Controllers\GoodiesController::class, 'getPetitsStocks']);
