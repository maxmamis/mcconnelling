module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        loadFiles: {
            source: 'src',
            public: 'public'
        },

        watch: {
            copy: {
                files: ['src/scripts/**/*.js', 'images/**/*'],
                tasks: ['copy:dev']
            },
            
            styles: {
                files: ['src/styles/*.less', 'src/styles/**/*.less'],
                tasks: ['less:dev'],
                options: {
                    livereload: true
                }
            },

            markup: {
                files: ['src/jade/**/*.jade'],
                tasks: ['jade:dev'],
                options: {
                    livereload: true
                }
            }
        },

        jade: {
            files: {
                'public/index.html': 'src/jade/index.jade',
            },
            dev: {
                files: ['<%= jade.files %>'],
                options: {
                    pretty: true,
                    data: {
                        dev: true
                    }
                }
            },
            
            deploy: {
                files: ['<%= jade.files %>'],
                options: {
                    pretty: false,
                    data: {
                        dev: false
                    }
                }
            }
        },
                
        less: {
            files: {
                'public/styles/mcconnelling.css': 'src/styles/mcconnelling.less',
            },

            dev: {
                files: ['<%= less.files %>'],
                options: {
                    compress: false
                }
            },
            
            deploy: {
                files: ['<%= less.files %>'],
                options: {
                    yuicompress: true
                }
            }
        },
        
        uglify: {
            files: {expand: true, flatten: true, src: ['src/scripts/**/*.js'], dest: 'public/scripts/', filter: 'isFile'},
            
            deploy: {
                files: ['<%= uglify.files %>'],
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                }
            }
        },

        copy: {
            dev: {
                files: [
                    '<%= uglify.files %>',
                    { expand: true, flatten: true, src: ['images/*'], dest: 'public/img/', filter: 'isFile' }
                ]
            },
      
            deploy: {
                files: [
                    // before real deploy, remove uglify.files here and include scripts to be concatenated
                    // in concat.deploy below
                    '<%= uglify.files %>',
                    { expand: true, flatten: true, src: ['images/*'], dest: 'public/img/', filter: 'isFile' }
                ]
            }
        },
        
        // concat: {
        //  deploy: {
        //      src: ['public/scripts/matchMedia.js', 'public/scripts/breakpoints.js', 'public/scripts/instagram.js', 'public/scripts/jquery_plugins.js', 'public/scripts/prolific.js'],
        //      dest: 'public/scripts/prolific.min.js'
        //  }
        // },
        
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: '[public]',
                    hostname: '*',
                    keepalive: 'true'
                }
            }
        },

        concurrent: {
            develop: ['watch', 'connect']
        }
    });

    grunt.registerTask('build:dev', ['less:dev', 'jade:dev', 'copy:dev']);
    grunt.registerTask('build:deploy', ['less:deploy', 'jade:deploy', 'uglify:deploy', 'concat:deploy', 'copy:deploy']);
    grunt.registerTask('deploy', ['build:deploy']);
    grunt.registerTask('develop', ['build:dev', 'concurrent']);
};