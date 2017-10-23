class GmPlace {
  constructor($q, uiGmapIsReady) {
    this.$q = $q;
    this.uiGmapIsReady = uiGmapIsReady;
    this.autocompleteService = null;
    this.placeService = null;
    let map = null;

    this.getLatLngByAddress = this.getLatLngByAddress.bind(this);

    uiGmapIsReady.promise(1).then((instances) => {
      if (!google || !google.maps) {
        throw new Error('Google Maps JS library is not loaded!');
      } else if (!google.maps.places) {
        throw new Error('Google Maps JS library does not have the Places module');
      }
      this.autocompleteService = new google.maps.places.AutocompleteService();
      map = new google.maps.Map(document.createElement('div'));
      this.placeService = new google.maps.places.PlacesService(map);
      this.geocoder = new google.maps.Geocoder();
    });
  }


	searchByCoords({lat, lng, callback}) {
    const latlng = new google.maps.LatLng(lat, lng);
    if(!this.geocoder)
			this.geocoder = new google.maps.Geocoder();
		this.geocoder.geocode({
      'latLng': latlng
    }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          callback(results[1]);
        } else {
          callback(null);
        }
      }
    });
  }

  search(input) {
    if (!input) {
      return;
    }
    const deferred = this.$q.defer();
    this.getResults({input}).then((places) => {
      deferred.resolve(places);
    });
    return deferred.promise;
  };

  getResults({input}) {
    const deferred = this.$q.defer();
    const config = {input};
    this.autocompleteService.getQueryPredictions(config, function (data) {
      deferred.resolve(data);
    });
    return deferred.promise;
  };

  getLatLngByPlace(place) {
    if (!place) {
      return;
    }
    const deferred = this.$q.defer();
    this.getDetails(place).then(function (details) {
      const data = {
        'name': place.description,
        'lat': details.geometry.location.lat(),
        'lng': details.geometry.location.lng(),
      };
      deferred.resolve(data);
    });
    return deferred.promise;
  }

  getDetails(place) {
    const deferred = this.$q.defer();
    this.placeService.getDetails({
      'placeId': place.place_id
    }, function (details) {
      deferred.resolve(details);
    });
    return deferred.promise;
  };

  getLatLngByAddress(address) {
    const deffered = this.$q.defer();
    const searchPromise = this.search(address);
    if(!searchPromise) {
      deffered.resolve({});
      return deffered;
    }

    searchPromise.then((places) => {

      if(!places || !places[0]) {
        deffered.resolve({});
        return deffered;
      }
      this.getLatLngByPlace(places[0]).then((geometry)=>{
        deffered.resolve(geometry);
      })
    });

    return deffered.promise;
  };
}

export default GmPlace;
