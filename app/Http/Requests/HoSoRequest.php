<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HoSoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'ho_ten_chu_ho' => 'required|string|max:255',
            'so_to' => 'required|integer',
            'so_thua' => 'required|integer',
            'id_phuong' => 'required|integer',
            'id_quan' => 'required|integer',
        ];
    }
}
