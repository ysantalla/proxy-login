import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-index",
  template: `
    <br />
    <div class="grid-container">
      <div
        class="container"
        fxLayout="row"
        fxLayout.xs="column"
        fxLayoutAlign="center start"
      >
        <div
          class="item mat-elevation-z8"
          fxFlex="55%"
          fxFlex.xs="100%"
          fxFlex.md="100%"
        >
          <mat-toolbar class="card-toolbar" color="primary">
            <mat-toolbar-row>
              Acerca de PMProxy
            </mat-toolbar-row>
          </mat-toolbar>

          <mat-card class="dashboard-card">
            <mat-card-content class="dashboard-card-content">
              <br />

              <div class="container">
                <pre><code> ____  __  __ ____
|  _ |  /  |  _  _ __ _____  ___   _
| |_) | |/| | |_) | '__/ _  / / | | |
|  __/| |  | |  __/| | | (_) &gt;  &lt;| |_| |
|_|   |_|  |_|_|   |_|  ___/_/_\\__, |
                                  |___/
</code></pre>
                <p>
                  <a href="https://github.com/lamg/pmproxy/blob/master/LICENSE"
                    ><img
                      src="https://camo.githubusercontent.com/bca523fe54c1f5d8b3def90208f4cb1fc7cb1be2/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d4147504c253230332532422d626c75652e737667"
                      alt="License Badge"
                      data-canonical-src="https://img.shields.io/badge/License-AGPL%203%2B-blue.svg"
                      style="max-width:100%;"
                  /></a>
                  <a href="https://travis-ci.com/lamg/pmproxy" rel="nofollow"
                    ><img
                      src="https://camo.githubusercontent.com/734878d9c165dc0d3e226b20ea0f75db50fc3f30/68747470733a2f2f7472617669732d63692e636f6d2f6c616d672f706d70726f78792e7376673f6272616e63683d6d6173746572"
                      alt="Build Status"
                      data-canonical-src="https://travis-ci.com/lamg/pmproxy.svg?branch=master"
                      style="max-width:100%;"
                  /></a>
                  <a
                    href="https://coveralls.io/github/lamg/pmproxy?branch=master"
                    rel="nofollow"
                    ><img
                      src="https://camo.githubusercontent.com/8ac32eb3a7fe083e2935bb68aa9f5655eb056f00/68747470733a2f2f636f766572616c6c732e696f2f7265706f732f6769746875622f6c616d672f706d70726f78792f62616467652e7376673f6272616e63683d6d6173746572"
                      alt="Coverage Status"
                      data-canonical-src="https://coveralls.io/repos/github/lamg/pmproxy/badge.svg?branch=master"
                      style="max-width:100%;"
                  /></a>
                  <a
                    href="https://goreportcard.com/report/github.com/lamg/pmproxy"
                    rel="nofollow"
                    ><img
                      src="https://camo.githubusercontent.com/90cf83f82f48504969498d110ba0db0100fd337c/68747470733a2f2f676f7265706f7274636172642e636f6d2f62616467652f6769746875622e636f6d2f6c616d672f706d70726f7879"
                      alt="Go Report Card"
                      data-canonical-src="https://goreportcard.com/badge/github.com/lamg/pmproxy"
                      style="max-width:100%;"
                  /></a>
                </p>
                <p>
                  PMProxy wraps an HTTP proxy server with procedures that
                  process each HTTP request according information it carries and
                  a set of rules.
                </p>
                <p>The information analyzed in each HTTP request is:</p>
                <ul>
                  <li>client IP address</li>
                  <li>Time it arrived</li>
                  <li>requested URL</li>
                </ul>
                <p>
                  With that information, using an Active Directory server and a
                  map of IPs and logged users (which is kept in memory) it gets
                  the user's groups in that Active Directory.
                </p>
                <p>
                  The rules are predicates (not, or, and) on the previous
                  information, and they have connection parameters associated.
                  These are:
                </p>
                <ul>
                  <li>The parent proxy for making the request.</li>
                  <li>The network interface for making the connection.</li>
                  <li>The limit on data amount to be downloaded (quota).</li>
                  <li>The connection delay.</li>
                </ul>
                </div>

              <br />

              <h1 class="mat-h1">Developers</h1>

              <h2 class="mat-h2">
                <mat-icon>person</mat-icon>Yasmany Santalla Pereda (Frontend
                developer)
              </h2>
              <h2 class="mat-h2">
                <mat-icon>person</mat-icon>Luis Angel Mendez Gort (Backend
                developer)
              </h2>
            </mat-card-content>
          </mat-card>
        </div>

        <br />

        <br />
      </div>
    </div>
  `,
  styles: []
})
export class IndexComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
