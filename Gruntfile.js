module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		watch: {

			homehtml: {
				files: ['src/html/**/*.html','src/html/**/*.php'],
				tasks: ['concat','minhtml'],
			},

			homecss: {
				files: [
					'src/less/**/*.less',
					'!src/less/**/_*.less'
				],
				tasks: ['mincss'],
			},

			homejs: {
				files: ['src/js/*.js'],
				tasks: ['js'],
			},

			img: {
				files: ['src/**/*.{png,jpg,svg}'],
				tasks: ['minimg'],
			},
		},

		less: {

			options : {
				plugins : [ new (
					require('less-plugin-autoprefix'))({
						browsers : [ "last 2 versions" ]
					})
				]
			},

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
				src: [
					'src/html/header.html',
					'src/html/menu.html',
					'src/html/views/home.html',
					'src/html/views/about.html',
					'src/html/views/skills.html',
					'src/html/views/experience.html',
					'src/html/views/contact.html',
					'src/html/footer.html'],
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

		browserify: {

			build : {

				files: {
					'src/build/js/scripts.js' : [
						'core-js/stable',
						'regenerator-runtime/runtime',
						'src/js/index.js'
					],
				},

				options: {
					transform: [
						[
							'babelify',
							{
								presets: [[
									"@babel/preset-env",
									{
										corejs:"3",
										useBuiltIns: 'usage',
										targets: {
											browsers: ['> 0.25%, not dead'],
										},
									},
								]]
							}
						]
					],

					browserifyOptions: {
						debug: true
					}
				}
			}
		},

		uglify: {

			options: {
				mangle: false
			},

			homejs: {
				src: [
					'src/build/js/scripts.js',
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
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-tinyimg');

	// Default task(s).
	grunt.registerTask('default', ['compile','minimg','watch']);

	// Minificators
	grunt.registerTask('minhtml', ['htmlmin:home']);
	grunt.registerTask('mincss', ['less:home', 'cssmin']);
	grunt.registerTask('js', ['browserify']);
	grunt.registerTask('minimg',['tinyimg:imagemin'])

	// Compilers
	grunt.registerTask('compile', ['concat:home','minhtml','mincss','js']);

	// Watchers
	grunt.registerTask('watchall', ['watch']);
	grunt.registerTask('watchhtml', ['concat:home','minhtml','watch:homehtml']);
	grunt.registerTask('watchcss', ['mincss','watch:homecss']);
	grunt.registerTask('watchjs', ['js','watch:homejs']);
	grunt.registerTask('watchimg', ['minimg','watch:img']);
};
