import _ from 'lodash';

class GmapCtrl {
	constructor($scope, $rootScope, uiGmapGoogleMapApi) {
		'ngInject';

		this.$rootScope = $rootScope;
		this.$scope = $scope;
		this.mapInstance = null;

		uiGmapGoogleMapApi.then((googleMaps) => {	});

		this.visibilityPopup = false;

		$scope.$watch(() => this.visibilityPopup, (newVal) => {
			if(newVal && this.mapInstance){
				this.resize(400);
			}
		});

		this.map = {
			zoom: 11,
			center: {
				latitude: 50.4277427,
				longitude: 3.5161115
			},
			options: {
				zoomControl: true,
				mapTypeControl: false,
				scaleControl: false,
				streetViewControl: false,
				rotateControl: false
			},
			marker: {
				id: 0,
				coords: {},
				options: {
					visible: false
				}
			},
			mapEvents: {
				click: (gMarker, event, originalEventArgs) => {
					$scope.$apply(() => {
						let e = originalEventArgs[0];
						this.map.marker.options.visible = true;
						this.map.marker.coords.latitude = e.latLng.lat();
						this.map.marker.coords.longitude = e.latLng.lng();
						this.onSelect(this.map.marker.coords);
					});
				},
				bounds_changed: (mapInstance) => {
					//https://stackoverflow.com/questions/18444161/google-maps-responsive-resize
					this.mapInstance = mapInstance;
					this.resize();
				}
			}
		};
	}

	$onInit(){
		if(this.ngModel){
			const lat = this.ngModel.lat || 51.509865;
			const lon = this.ngModel.lon || -0.118092;
			this.map.marker.coords.latitude = lat;
			this.map.marker.coords.longitude = lon;
			this.map.marker.options.visible = true;
			this.map.center.latitude = lat;
			this.map.center.longitude = lon;
		}
	}

	resize(delay=0){
		const {mapInstance} = this;
		setTimeout(() => {
			const center = mapInstance.getCenter();
			const zoom = mapInstance.getZoom();
			google.maps.event.trigger(mapInstance, "resize");
			mapInstance.setCenter(center);
			mapInstance.setZoom(zoom);
		}, delay);
	}

	close(){
		this.visibilityPopup = false;
	}

	openPopup(){
		this.ngClick();
		setTimeout(() => {
			this.$scope.$apply(() => {
				this.visibilityPopup=true;
			})
		}, 100);

	}
}

export default GmapCtrl;