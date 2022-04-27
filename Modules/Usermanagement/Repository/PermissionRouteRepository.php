<?php
namespace Modules\Usermanagement\Repository;

class PermissionRouteRepository{
	/**
	 * @return get all list of routes
	 */
	private function routeCollection(){
		$routes=\Route::getRoutes()->getRoutesByMethod();
		return array_merge($routes['GET'],$routes['POST'],$routes['DELETE'],$routes['PUT']);
	}
	
	/**
	 * @return make a route list 
	 */
	public function routeList(){
		$routes=$this->routeCollection();
		return $this->filterRoutes($routes);
	}
	/**
	 * @return filter routes
	 */
	public function filterRoutes($routes){
		$adminRoutes;
		$childRoutes=[];
		foreach($routes as $route){
			if (\Str::startsWith($route->uri(), 'api/admin' )) {
				$prefix = 'api/admin' ? $route->getPrefix() : ltrim($route->getPrefix(),'/');
				$prefixArr=explode('/',$prefix);
				$module=end($prefixArr);
				switch ($length=sizeof($prefixArr)) {
					case $length>=3:
						$adminRoutes[$module] =[
							'all'=>$prefix . '/*',
							'view'=>$prefix
						];
						break;
					default:
						$adminRoutes[$module]=[
							'full-control'=>$prefix . '/*',
						];
					break;
				}
				foreach ($route->methods as $key => $method) {
					if ($method != 'HEAD' && !collect($this->without())->first(function ($exp) use ($route) {
						return \Str::startsWith($route->uri, $exp);
					})) {
						$urlArr=explode('/',$route->uri);
						if(!empty($urlArr) && isset($urlArr[2]) && isset($urlArr[3])){
							$childRoutes[$urlArr[2]][$urlArr[3]]=$route->uri;
						}
					}
				}
			}

		}
		$finalRoute=array_merge_recursive($adminRoutes,$childRoutes);
		unset($finalRoute['api']);
		return $finalRoute;
	}
	public function without()
    {
        $prefix = 'api/admin' ? 'api/admin/' : '';
        return [
        	$prefix.'login',
        	$prefix.'logout',
            $prefix.'dashboard',
            $prefix.'permission/route/list',
			$prefix.'user/permission'
        ];
    }
}