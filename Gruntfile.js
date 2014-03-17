module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-rename');
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
            target: 'target'
        },
        
        watch: {
            copy: {
                files: ['build/js/**/*.js'],
                tasks: ['copy:dev']
            },
            
            styles: {
                files: ['build/less/app.less'],
                tasks: ['less:dev'],
                options: {
                    livereload: true
                }
            },
            
            markup: {
                files: ['build/kit/**/*.kit'],
                tasks: ['rename:dev'],
                options: {
                    livereload: true
                }
            }
        },
        
        less: {
            files: {
                'www/_/css/app.css': 'build/less/app.less'
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
            files: {expand: true, flatten: true, src: ['build/js/**/*.js'], dest: 'www/_/js', filter: 'isFile'},
            
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
                    {src: ['build/kits/index.kit'], dest: 'www/index.html'}
                ]
            },
      
            deploy: {
                files: [
                    '<%= uglify.files %>',
                    {src: ['build/kits/index.kit'], dest: 'www/index.html'}
                ]
            }
        },

        rename: {
            dev: {
                // files: [
                //     {src: ['build/kits/index.kit'], dest: 'www/index.html'}
                // ]
            },

            deploy: {
                // files: [
                //     {src: ['build/kits/index.kit'], dest: 'www/index.html'}
                // ]
            }
        },
        
        // concat: {
        //     deploy: {
        //         src: ['target/scripts/matchMedia.js', 'target/scripts/breakpoints.js', 'target/scripts/instagram.js', 'target/scripts/jquery_plugins.js', 'target/scripts/prolific.js'],
        //         dest: 'target/scripts/prolific.min.js'
        //     }
        // },
        
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: 'target',
                    hostname: '*',
                    keepalive: 'true'
                }
            }
        },
        
        concurrent: {
            develop: ['watch', 'connect']
        }
    });

    grunt.registerTask('build:dev', ['less:dev', 'jade:dev', 'copy:dev', 'rename:dev']);
    grunt.registerTask('build:deploy', ['less:deploy', 'copy:deploy', 'uglify:deploy']);//'rename:deploy']);
    grunt.registerTask('deploy', ['build:deploy']);
    grunt.registerTask('develop', ['build:dev', 'concurrent']);
};