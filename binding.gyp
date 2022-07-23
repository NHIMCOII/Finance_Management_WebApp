

{
  "targets": [
    {
      "target_name": "binding",
      "sources": [ "src/binding.cc" ]
    }
  ],
  'conditions': [
    ['OS=="mac"', {
        'link_settings': {
          'libraries': ['/opt/homebrew/lib/libodbc.a'],
        },
        'defines': [
          'LINUX_BUILD',
          'UNICODE'
        ], 
        'cflags_cc': [
          '-std=c++1y'
        ],
        'include_dirs': [
          '/usr/local/include/',
          '/usr/local/opt/msodbcsql17/include/',
          '/usr/local/opt/msodbcsql17/include/msodbcsql17/',
          '/opt/homebrew/include',
          '/opt/homebrew/include/msodbcsql17'
        ],
    }]
  ]
}        