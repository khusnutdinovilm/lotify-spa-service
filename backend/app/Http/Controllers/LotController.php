<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lot;
use App\Http\Resources\LotResource;
use Illuminate\Support\Facades\Storage;

class LotController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lots = Lot::paginate(20);

        return LotResource::collection($lots);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
            'status' => 'required|in:active,finished',
        ]);


       if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('photos', 'public');
            $validated['photo'] = $photoPath;
        } else {
            return response()->json(['error' => 'Photo file is required'], 422);
        }

        $lot = Lot::create($validated);

        return (new LotResource($lot))->response();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $lot = Lot::findOrFail($id);

        $validated = $request->validate([
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'title' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric',
            'status' => 'sometimes|required|in:active,finished',
        ]);

        if ($request->hasFile('photo')) {
            if ($lot->photo && Storage::disk('public')->exists($lot->photo)) {
                Storage::disk('public')->delete($lot->photo);
            }

            $photoPath = $request->file('photo')->store('photos', 'public');
            $validated['photo'] = $photoPath;
        }


        $lot->update($validated);

        return (new LotResource($lot))->response();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $lot = Lot::findOrFail($id);
        $lot->delete();

        return response()->json(null, 204);
    }
}
