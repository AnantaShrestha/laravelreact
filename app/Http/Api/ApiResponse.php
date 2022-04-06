<?php 
namespace App\Http\Api;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
class ApiResponse {
    /**
     * ResponseError
     * 
     * Returns the errors data if there is any error
     *
     * @param object $errors
     * @return Response
     */
    public function responseError($errors, $message = 'Data is invalid', $status_code = JsonResponse::HTTP_BAD_REQUEST)
    {
        return response()->json([
            'status' => false,
            'message' => $message,
            'errors' => $errors,
            'data' => null,
        ], $status_code);
    }

    /**
     * ResponseSuccess
     * 
     * Returns the success data and message if there is any error
     *
     * @param object $data
     * @param string $message
     * @param integer $status_code
     * @return Response
     */
    public function responseSuccess($data, $message = "Successfull", $status_code = JsonResponse::HTTP_OK)
    {
        return response()->json([
            'status' => true,
            'message' => $message,
            'data' => $data,
        ], $status_code);
    }
}