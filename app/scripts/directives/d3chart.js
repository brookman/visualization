'use strict';

angular.module('visApp')
  .directive('d3chart', function (d3Service, $window) {
    return {
      restrict: 'E',
      scope: {
        matrix: '='
      },
      link: function (scope, element) {
        d3Service.d3().then(function (d3) {

          scope.$watch('matrix', function () {
            scope.render();
          });

          var svgContainer = d3.select(element[0]).append('svg');
          svgContainer.style('width', '100%');

          // Browser onresize event
          window.onresize = function () {
            scope.$apply();
          };

          // Watch for resize event
          scope.$watch(function () {
            return angular.element($window)[0].innerWidth;
          }, function () {
            scope.render();
          });

          scope.render = function () {
            var width = element.innerWidth();
            var height = width * 1.0;

            svgContainer.style('height', height);
            svgContainer.html('');
            var svg = svgContainer.append('g');
            svg.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

            var innerRadius = Math.min(width, height) * 0.41,
              outerRadius = innerRadius * 1.1;

            var matrix = [
              [0, 0, 1, 1, 0.5],
              [0, 0, 0, 0, 0.5],
              [1, 0, 0, 0, 0],
              [1, 0, 0, 0, 0],
              [0.5, 0.5, 0, 0, 0]
            ];

            if (scope.matrix) {
              matrix = scope.matrix;
            }

            var chord = d3.layout.chord()
              .padding(0.05)
              .sortSubgroups(d3.descending)
              .matrix(matrix);


            var fill = d3.scale.ordinal()
              .domain(d3.range(6))
              .range(['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']);

            svg.append('g').selectAll('path')
              .data(chord.groups)
              .enter().append('path')
              .style('fill', function (d) {
                return fill(d.index);
              })
              .style('stroke', function (d) {
                return fill(d.index);
              })
              .attr('d', d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
              .on('mouseover', fade(0.1))
              .on('mouseout', fade(1));

            svg.append('g')
              .attr('class', 'chord')
              .selectAll('path')
              .data(chord.chords)
              .enter().append('path')
              .attr('d', d3.svg.chord().radius(innerRadius))
              .style('fill', function (d) {
                return fill(d.target.index);
              })
              .style('opacity', 1);

// Returns an array of tick angles and labels, given a group.
//            function groupTicks(d) {
//              var k = (d.endAngle - d.startAngle) / d.value;
//              return d3.range(0, d.value, 1000).map(function (v, i) {
//                return {
//                  angle: v * k + d.startAngle,
//                  label: i % 5 ? null : v / 1000 + 'k'
//                };
//              });
//            }

// Returns an event handler for fading a given chord group.
            function fade(opacity) {
              return function (g, i) {
                svg.selectAll('.chord path')
                  .filter(function (d) {
                    return d.source.index !== i && d.target.index !== i;
                  })
                  .transition()
                  .style('opacity', opacity);
              };
            }


          };
        });
      }
    };
  });
