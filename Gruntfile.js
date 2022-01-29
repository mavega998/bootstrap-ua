module.exports = function (grunt) {
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
          dest: 'dist/'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.registerTask('css', ['sass'])
  grunt.registerTask('default', ['browserSync', 'watch'])
  grunt.registerTask('img:compress', ['imagemin'])
};