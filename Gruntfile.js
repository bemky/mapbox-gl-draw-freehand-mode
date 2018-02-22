'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    buildcontrol: 'grunt-build-control'
  });

  grunt.initConfig({
    clean: {
      demo: ['build']
    },
    copy: {
      demo: {
        files: {
          'build/index.html': ['demo/index.html']
        }
      }
    },

    browserify: {
      options: {
        alias: {
          '@mapbox/mapbox-gl-draw-free-mode': './src/index.js'
        }
      },
      demo: {
        files: {
          'build/index.js': ['demo/index.js']
        },
        options: {
          watch: true
        }
      }
    },

    buildcontrol: {
      options: {
        dir: 'build',
        commit: true,
        push: true,
        connectCommits: false,
        message: 'Built live demo from commit %sourceCommit%'
      },
      demo: {
        options: {
          // Update the remote to point to your github repo
          remote: 'git@github.com:bemky/mapbox-gl-draw-free-mode.git',
          branch: 'gh-pages',
        }
      }
    },

    connect: {
      dev: {
        options: {
          base: 'build',
          hostname: 'localhost',
          port: 3000,
          livereload: true
        }
      }
    },

    watch: {
      dev: {
        files: 'build/index.js',
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('build', ['clean', 'copy', 'browserify']);
  grunt.registerTask('serve', ['build', 'connect', 'watch']);
  grunt.registerTask('deploy', ['build', 'buildcontrol']);
  grunt.registerTask('default', ['serve']);
};