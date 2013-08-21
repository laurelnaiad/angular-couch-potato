module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.renameTask('bower', 'bowerInstall');
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('doBower', ['bowerInstall', 'bower']);
  grunt.registerTask('default', ['jshint','build']);
  grunt.registerTask('build', ['clean', 'doBower', 'concat']);
  grunt.registerTask('release', ['build','uglify:dist','jshint']);

  // Print a timestamp (useful for when watching)
  grunt.registerTask('timestamp', function() {
    grunt.log.subhead(Date());
  });

  // Project configuration.
  grunt.initConfig({
    dirs: {
      dist: 'dist',
      src: {
        js: ['src/**/couchPotato.js']
      }
    },
    pkg: grunt.file.readJSON('package.json'),
    banner:
    '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
    ' * Copyright (c) <%= grunt.template.today(\'yyyy\') %> <%= pkg.author.name %>;\n' +
    ' *    Uses software code found at https://github.com/szhanginrhythm/angular-require-lazyload\n' +
    ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
    clean: ['<%= dirs.dist %>/*'],
    bower: {
      dev: {
        dest: '<%= dirs.dist %>/dependencies'
      }
    },
    bowerInstall: {
      install: {
      }
    },
    concat: {
      dist: {
        options: {
          banner: '<%= banner %>',
          stripBanners: true
        },
        src:['<%= dirs.src.js %>'],
        dest:'<%= dirs.dist %>/<%= pkg.name %>.js'
      }
    },
    uglify:{
      dist: {
        options: {
          banner: '<%= banner %>'
        },
        src:'<%= dirs.dist %>/<%= pkg.name %>.js',
        dest:'<%= dirs.dist %>/<%= pkg.name %>.min.js'
      }
    },
    jshint:{
      files:['Gruntfile.js', '<%= dirs.src.js %>'],
      options: {
        jshintrc: '.jshintrc'
      }
    }
  });
};
