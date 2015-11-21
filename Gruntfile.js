// jshint ignore: start
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 9001,
          hostname: '*',
          keepalive: true
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.server.options.port %>/'
      }
    },
    react: {
      dynamic_mappings: {
        files: [
          {
            expand: true,
            cwd: 'scripts/',
            src: ['**/*.jsx'],
            dest: 'modules/',
            ext: '.jsx.js'
          }
        ]
      }
    },
    jshint: {
      all: {
        src: ['Gruntfile.js', 'scripts/**/*.jsx', 'scripts/**/*.js'],
        options: {
          jshintrc: '.jshintrc'
        }
      }
    },
    webpack: {
      default: {
        entry: {
          GriddleWithCallback: './scripts/griddleWithCallback.jsx',
          },
        output: {
          path: __dirname,
          filename: 'build/[name].js',
          publicPath: '/',
          library: "[name]",
          libraryTarget: "umd"
        },
        resolve: {
          extensions: ['', '.js', '.jsx']
        },
        module: {
          loaders: [
            {test: /\.jsx$/, loader: 'babel'}
          ]
        },
        externals: {
          "react": "React",
          "underscore": "_",

        }
      },
    },
  });

  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-jsxhint');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      'webpack',
      'react',
      'connect',
      'open',
    ]);
  });

  // Default task(s).
  grunt.registerTask('default', ['serve']);
};
