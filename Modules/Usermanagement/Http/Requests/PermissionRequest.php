<?php

namespace Modules\Usermanagement\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Http\Api\ApiResponse;
class PermissionRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'=>'required|unique:permissions,name,'.$this->id,
            'access_uri'=>'nullable'
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /*** Get the error messages for the defined validation rules.** @return array*/
    protected function failedValidation(Validator $validator)
    {
        $errors=$validator->errors();
        throw new HttpResponseException((new ApiResponse)->responseError($errors,'Validation Failed',VALIDATIONERROR));
    }
}
