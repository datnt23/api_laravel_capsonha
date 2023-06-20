<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChiTietHoSoRequest extends FormRequest
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
            'noi_dung' => 'string|max:255',
            'toa_do_x' => 'string|max:255',
            'toa_do_y' => 'string|max:255',
            'loi_nhan' => 'string|max:255',
        ];
    }
}
