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
