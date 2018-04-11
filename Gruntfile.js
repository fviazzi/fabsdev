module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		watch: {

			homehtml: {
				files: ['src/html/*.html','src/html/*.php'],
				tasks: ['concat','minhtml'],
			},

			homecss: {
				files: ['src/less/**/*.less'],
				tasks: ['mincss'],
			},

			homejs: {
				files: ['src/js/*.js'],
				tasks: ['minjs'],
			},
		},

		less: {

			home: {
				src: ["src/less/general.less","src/less/**/*.less"],
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
		},

		concat: {

			home: {
				src: ['src/html/header.html', 'src/html/index.html', 'src/html/footer.html'],
				dest: 'src/build/html/index.html',
			},
		},

		htmlmin: {

			options: {
			  removeComments: true,
			  collapseWhitespace: true
			},

			home: {
				files: { 'upload/index.html' : 'src/build/html/index.html' },
			},

		},

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
		},
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', ['watch']);

	// Minificators
	grunt.registerTask('minhtml', ['htmlmin:home']);
	grunt.registerTask('mincss', ['less:home', 'cssmin']);
	grunt.registerTask('minjs', ['uglify']);

	// Compilers
	grunt.registerTask('compile', ['concat:home','minhtml','mincss','minjs']);

	// Watchers
	grunt.registerTask('watchall', ['concat:home','minhtml','mincss','minjs','watch']);
	grunt.registerTask('watchhtml', ['concat:home','minhtml','watch:homehtml']);
	grunt.registerTask('watchcss', ['mincss','watch:homecss']);
	grunt.registerTask('watchjs', ['minjs','watch:homejs']);
};
