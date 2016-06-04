module.exports = function (grunt) {
  // Load tasks.
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.initConfig({
    coffee: {
      options: {
        bare: true
      },
      compile: {
        files: {
          'bayes.js': ['bayes.coffee']
        }
      }
    },
    browserify: {
      build: {
        files: {
          '../bayes.js': ['bayes.js']
        }
      }
    },
    uglify: {
      build: {
        files: {
          '../bayes.min.js': ['../bayes.js']
        }
      }
    },
    sass: {
      dist: {
        options: {
          'sourcemap': 'none',
          'style': 'expanded',
          'noCache': true
        },
        files: {
          'style.css': 'style.scss'
        }
      }
    },
    cssmin: {
      build: {
        files: {
          '../style.css': ['style.css']
        }
      }
    },
    jade: {
      compile: {
        options: {
          pretty: false
        },
        files: {
          '../index.html': 'index.jade'
        }
      }
    },
    watch: {
      css: {
        files: ['style.scss'],
        tasks: [
          'sass:dist',
          'cssmin:build'
        ]
      },
      coffee: {
        files: ['bayes.coffee'],
        tasks: [
          'coffee:compile',
          'browserify:build',
          'uglify:build'
        ]
      },
      jade: {
        files: ['index.jade'],
        tasks: ['jade:compile']
      }
    }
  });

  grunt.registerTask('build', [
    'coffee:compile',
    'browserify:build',
    'uglify:build',
    'sass:dist',
    'cssmin:build',
    'jade:compile'
  ]);
};
