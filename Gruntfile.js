module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  })

  grunt.initConfig({
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/css',
          src: ['*.scss'],
          dest: 'assets/css',
          ext: '.css'
        }]
      }
    },
    watch: {
      files: ['assets/css/*.scss'],
      tasks: ['css']
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'assets/css/*.css',
            '*.html',
            'assets/js/*.js'
          ]
        }
      },
      options: {
        watchTask: true,
        server: {
          baseDir: './'
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: './',
          src: 'assets/imgs/*.{png,gif,jpg,jpeg}',
          dest: 'dist'
        }]
      }
    },
    copy: {
      html: {
        files: [{
          expand: true,
          dot: true,
          cwd: './',
          src: ['*.html'],
          dest: 'dist/'
        }]
      }
    },
    clean: {
      build: {
        src: ['dist/']
      }
    },
    cssmin: {
      dist: {}
    },
    uglify: {
      dist: {}
    },
    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 20
      },
      release: {
        files: [{
          src: [
            'dist/js/*.js',
            'dist/css/*.css'
          ]
        }]
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {}
    },
    useminPrepare: {
      foo: {
        dest: 'dist/',
        src: ['index.html', 'about.html', 'pricing.html', 'contact.html']
      },
      options: {
        flow: {
          steps: {
            css: ['cssmin'],
            js: ['uglify']
          },
          post: {
            css: [{
              name: 'cssmin',
              createConfig: function(context, block) {
                const generated = context.options.generated;
                generated.options = {
                  keepSpecialComments: 0,
                  rebase: false
                }
              }
            }]
          }
        }
      }
    },
    usemin: {
      html: ['dist/index.html', 'dist/about.html', 'dist/pricing.html', 'dist/contact.html'],
      options: {
        assetsDir: ['dist', 'dist/css', 'dist/js']
      }
    }
  });

  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-sass');
  // grunt.loadNpmTasks('grunt-browser-sync');
  // grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.registerTask('css', ['sass'])
  grunt.registerTask('default', ['browserSync', 'watch'])
  grunt.registerTask('img:compress', ['imagemin'])
  grunt.registerTask('build', ['clean', 'copy', 'imagemin', 'useminPrepare', 'concat', 'cssmin', 'uglify', 'filerev', 'usemin'])
};