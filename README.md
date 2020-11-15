# Weiwei's personal website built with Hugo

## Prepare

* Install `scoop` or `choco` on Windows, or `brew` on Mac.
* Install `hugo-extended` on Windows, or `hugo` on Mac, with one of the listed commands:
  
  `scoop install hugo-extended`
  `choco install hugo-extended`
  `brew install hugo`

* Clone the repo.
  
  ```bash
  git clone git@github.com:weiwei/weiwei.github.io.git
  cd weiwei.github.io
  git submodule init
  git submodule update
  ```

## Write

* Add or update files under `content`. Change `config.toml` accordingly. 
* Run `hugo serve` to confirm the edit locally.
* Commit and push. GitHub will build it automatically with actions. 

## Customization

The site uses `hugo-coder` theme. Check the [docs](https://themes.gohugo.io/hugo-coder/)
about how to customize it.
