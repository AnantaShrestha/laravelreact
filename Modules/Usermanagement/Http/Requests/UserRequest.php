<?php

namespace Modules\Usermanagement\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Http\Api\ApiResponse;
class UserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'=>'required',
            'username'=>'required|unique:users,username,'.$this->id,
            'email'=>'required|email',
            'phone_no'=>'nullable',
            'password'=>$this->id == null ? 'required|confirmed' : 'nullable|confirmed',
            'activate'=>'nullable',
            'roles'=>'nullable|array'

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
