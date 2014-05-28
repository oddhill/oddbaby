module.exports = function(grunt) {

  grunt.registerTask('watch', [ 'watch' ]);

  grunt.initConfig({
    sass: {
      style: {
        files: {
          "css/main.css": "sass/main.scss",
          "css/print.css": "sass/print.scss",
          "css/normalize.css": "sass/normalize.scss"
        }
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },

      all: ['js/**/*.js']
    },
    watch: {
      js: {
        files: ['js/**/*.js'],
        tasks: ['jshint'],
        options: {
          livereload: false,
        }
      },
      css: {
        files: ['sass/**/*.scss'],
        tasks: ['sass:style'],
        options: {
          livereload: false,
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

};
