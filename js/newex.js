(function() {

    // Show/hide layer visibility
    var layers = $('#layers').on('click', function (e) {
        // event handler
        var value = e.target.value;
        if (value === 'temperature') {
            $('#canvasImage').toggle();
        }
        else if( value === 'wind') {
            $('.wind').toggle();
        }else if(value === 'cloud') {
            $('.clouds').toggle();
        }
    });

  var windSymbol = {
    halfWidth: 16,
    halfHeight: 16,
    scale: 40,
    orientation: 90
  };

  var width = 580,
    height = 800;
  var ANIMATION_MOVES = 18;

  var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

  svg.append("foreignObject")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "svgForeignObject");

  var projection = d3.geo.mercator()
    .center([-3.5, 55.8])
    .scale(2250)
    .translate([width / 2, height / 2]);

  // Timeline slider
  var slider = $("#slider").slider({
    range: "max",
    min: 0,
    max: ANIMATION_MOVES,
    value: 0
  });

  slider.on('slide', function (event, ui) {
    setTime(ui.value);
  });

  var latLongProj = new Edina.EPSG_27700();

  // Load the data
  d3.json("gb8.json", function (error, uk) {
    if (error) return console.error(error);

    var gb = topojson.feature(uk, uk.objects.gb);

    var path = d3.geo.path().projection(projection);
    var path2 = d3.geo.path().projection(projection);


    svg.append("path")
      .datum(gb)
      .attr("d", path);


    svg.selectAll(".subunit")
      .data(topojson.feature(uk, uk.objects.gb).features)
      .enter().append("path")
      .attr("class", function (d) {
        return "gb";
      })
      .attr("d", path);


    var clipPath = svg.append('clipPath')
      .attr('id', 'ukClipPath');

    clipPath.append('path')
      .datum(gb)
      .attr('d', path2);

    svg.append("image")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("clip-path", "url(#ukClipPath)")
      .attr("id", "canvasImage")
      .attr("xlink:href", "");


    // Load wind data
    d3.json("data/data_complete.json", function (error, data) {
      if (error) return console.error(error);

      // Heatmap


      doHeatMap(0);

      var symb = svg.selectAll('.symb')
        .data(data.data[0])
        .enter().append('path')
        .select(function(d, i) {
          return d.Easting > 2 && d.Easting < 9 && d.Northing > 1 && d.Northing < 15 ? this : null;
        })
        .attr('transform', function (d, i) {
          return transformWind(0, d, i);
        })
        .attr('d', function (d) {
          return symbols.getSymbol('wind', d.size);
        })
        .attr('fill', '#aaa')
        .attr('class', 'wind')
        .attr('stroke', '#333');


      // Moves the symbols on the map
      function doTransition(value) {
        symb.transition().attr('transform', function (d, i) {
          return transformWind(value, d, i);
        });
      };

      function transformWind(value, d, i) {
        if (value < data.data.length) {
          var point = data.data[value][i];
          var p = latLongProj.toGlobalLatLong(point.Northing * 70000, point.Easting * 65000);
          var scaleFactor = point["Wind Speed"] / windSymbol.scale;
          var rotationTranslation = [windSymbol.halfWidth * scaleFactor, windSymbol.halfHeight * scaleFactor];
          var rotationOrientation = ((point["Wind Direction"]-1) * 45 + windSymbol.orientation) % 360;
          var coord = projection([p[1], p[0]]);
          coord = [coord[0] - (windSymbol.halfWidth * scaleFactor), coord[1] - (windSymbol.halfHeight * scaleFactor)];
          return 'translate(' + coord[0] + ',' + coord[1] + ') rotate(' + rotationOrientation + ' ' + rotationTranslation[0] + ' ' + rotationTranslation[1] + ') scale(' + scaleFactor + ')';
        }
        return;
      }

      slider.on('slide', function (event, ui) {
        doTransition(ui.value);
      });

      // Load cloud data

      var cloudSymb = svg.selectAll('.symb')
        .data(data.data[0])
        .enter().append('path')
        .attr('transform', function (d, i) {
          return transformCloud(0, d, i);
        })
        .attr('d', function (d, i) { // d is svg path attr
          return transformCloudPath(0, d, i);
        })
        .attr("clip-path", "url(#ukClipPath);")
        .attr('stroke', '#333')
        .attr('class', 'clouds')
        .attr('style', function (d, i) {
          return transformCloudFill(0, d, i);
        });

      function transformCloud(value, d, i) {
        var point = data.data[value][i];
        var p = latLongProj.toGlobalLatLong(point.Northing * 70000, point.Easting * 65000);
        var coord = projection([p[1], p[0]]);
        return 'translate(' + coord[0] + ',' + coord[1] + ')';
      };

      function transformCloudPath(value, d, i) {

        if (!(i == 27 || i == 35 || i == 58 || i == 75 || i == 43 || i == 106 || i == 134 || i == 175)) {
          return null;
        }

        var point = data.data[value][i];
        var cover = point["Cloud Cover"];
        var symbol = null;
        if (cover < 2) {
          symbol = 'sun';
        } else if (cover < 3) {
          symbol = 'overcast';
        } else if (cover < 4) {
          symbol = 'cloudy';
        } else {
          symbol = 'rainy';
        }
        return symbols.getSymbol(symbol, 64);
      };

      function transformCloudFill(value, d, i) {
        var point = data.data[value][i];
        if (point["Cloud Cover"] < 2) {
          return 'fill:yellow';
        } else if (point["Cloud Cover"] < 3) {
          return 'fill:white';
        } else if (point["Cloud Cover"] < 4) {
          return 'fill:black';
        } else {
          return 'fill:blue';
        }
      };
      // Moves the symbols on the map
      function doTransitionCloud(value) {
        cloudSymb.transition().attr('transform', function (d, i) {
            return transformCloud(value, d, i);
          }).attr('d', function (d, i) {
            return transformCloudPath(value, d, i);
          })
          .attr('stroke', '#333')
          //  .attr('fill', function(d, i) {
          //    return transformCloudFill( value, d, i );
          .attr('style', function (d, i) {
            return transformCloudFill(value, d, i);

          }).duration(1) // hides the messy transform between shapes;
      }

      slider.on('slide', function (event, ui) {
        doTransitionCloud(ui.value);
      });

      function doHeatMap(value) {

        var heatpoints = [];

        d3.select("map")
          .data = data.data[value]
          .forEach(function (d, i) {
            var temperature = d["Temperature"];
            var northing = d["Northing"];
            var easting = d["Easting"];
            var p = latLongProj.toGlobalLatLong(northing * 70000, easting * 65000);
            var coord = projection([p[1], p[0]]);
            var heatpoint = {
              x: coord[0],
              y: coord[1],
              value: temperature
            };

            heatpoints.push(heatpoint);
          });

        var newdata = {
          max: 15,
          data: heatpoints
        };

        $(".heatmap-canvas").remove();

        var heatmapInstance2 = h337.create({
          container: document.getElementById('svgForeignObject'),
          radius: 55,
          maxOpacity: 0.4,
          minOpacity: 0,
          blur: .75
        });

        heatmapInstance2.setData(newdata);

        var canvas = $(".heatmap-canvas");
        var canvasdataUrl = canvas[0].toDataURL();
        $(".heatmap-canvas").hide();

        document.getElementById("canvasImage").setAttribute("href", canvasdataUrl);


        // Ensure the animation respects visibility checkbox
        if (!$('#temperature').is(':checked')) {
          $('#canvasImage').hide();
        }
      };

      slider.on('slide', function (event, ui) {
        doHeatMap(ui.value);
        $('.heatmap-canvas').index = 0;
      });

      doHeatMap(0);
    }); // end of async wind data


    // Put the shadow elements in the map
    eclipseShadow(svg, projection, slider, layers);
  }); // end of async map data

  eclipseAnimation(ANIMATION_MOVES, slider);

})();
