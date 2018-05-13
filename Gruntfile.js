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

			img: {
				files: ['src/**/*.{png,jpg,svg}'],
				tasks: ['minimg'],
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
				files: { 'upload/index.php' : 'src/build/html/index.html' },
			},

		},

		uglify: {

		  options: {
		    mangle: false
		  },

		  homejs: {
				src: [
					'src/js/*.js',
				],
				dest: 'upload/js/scripts.min.js',
		  }
		},

		tinyimg: {

      imagemin: {
        files: [{
          expand: true,
          cwd: 'src/img',
          src: ['**/*.{png,jpg,svg}'],
          dest: 'upload/img'
        }]
      }
    }
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-tinyimg');

	// Default task(s).
	grunt.registerTask('default', ['watch']);

	// Minificators
	grunt.registerTask('minhtml', ['htmlmin:home']);
	grunt.registerTask('mincss', ['less:home', 'cssmin']);
	grunt.registerTask('minjs', ['uglify']);
	grunt.registerTask('minimg',['tinyimg:imagemin'])

	// Compilers
	grunt.registerTask('compile', ['concat:home','minhtml','mincss','minjs']);

	// Watchers
	grunt.registerTask('watchall', ['compile','watch']);
	grunt.registerTask('watchhtml', ['concat:home','minhtml','watch:homehtml']);
	grunt.registerTask('watchcss', ['mincss','watch:homecss']);
	grunt.registerTask('watchjs', ['minjs','watch:homejs']);
	grunt.registerTask('watchimg', ['minimg','watch:img']);
};
