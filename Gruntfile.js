module.exports = function(grunt) {

  grunt.registerTask('watch', [ 'watch' ]);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    sass: {
      options: {
        sourcemap: "none",
        require: "sass-globbing",
      },
      style: {
        files: {
          "css/main.css": "scss/main.scss",
          "css/print.css": "scss/print.scss",
          "css/normalize.css": "scss/normalize.scss"
        }
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },

      all: ['js/**/*.js']
    },
    svg2png: {
      all: {
        files: [
          { cwd: 'graphics/', src: ['**/*.svg'], dest: 'graphics/' }
        ]
      }
    },
    scsslint: {
      allFiles: ['scss/**/*.scss'],
      options: {
        bundleExec: false,
        colorizeOutput: true,
        config: '.scss-lint.yml',
        reporterOutput: null,
        maxBuffer: 3000 * 1024,
        exclude: ['scss/print.scss', 'scss/normalize.scss']
      }
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
        files: ['scss/**/*.scss'],
        tasks: ['sass:style', 'scsslint'],
        options: {
          livereload: false,
        }
      }
    }
  });
};
