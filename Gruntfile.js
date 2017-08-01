module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		watch: {
			homehtml: {
				files: ['src/html/*.html','src/html/*.php'],
				tasks: ['homeHtml'],
			},
			homecss: {
				files: ['less/*.less'],
				tasks: ['homeCss'],
			},
			homejs: {
				files: ['src/js/*.js'],
				tasks: ['homeJs'],
			},
		},

		less: {
			homeLess: {
				src: ["src/less/general.less"],
				dest: "src/build/css/styles.css",
			}
		},

		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1
			},

			target: {
				files: {
					'upload/css/styles.min.css': ['src/build/css/styles.css']
				}
			}
		}

		htmlmin: {
			home: {
				options: {
				  removeComments: true,
				  collapseWhitespace: true
				},
				files: {
				  src: ['src/html/header.html','src/html/index.html'],
					dest: 'upload/index.html',
				}
			},
		}

		grunt.initConfig({
			uglify: {
			  options: {
			    mangle: false
			  },
			  homejs: {
			    files: {
			      src: [
							'src/js/app.js',
							'src/js/route.js'
						],
						dest: 'upload/js/scripts.min.js',
			    }
			  }
			}
		});
	});

	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['watch']);

	// Minificators
	grunt.registerTask('minhtml', ['htmlmin']);
	grunt.registerTask('mincss', ['cssmin']);
	grunt.registerTask('minjs', ['uglify']);

	// Compilers
	grunt.registerTask('compile', ['htmlmin','less','cssmin','uglify']);

	// Watchers
	grunt.registerTask('watch', ['watch']);
	grunt.registerTask('watchhtml', ['watch:homehtml']);
	grunt.registerTask('watchcss', ['watch:homecss']);
	grunt.registerTask('watchjs', ['watch:homejs']);
};
