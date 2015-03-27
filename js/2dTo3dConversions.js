  function point2D get2dPoint(Point3D point3D, Matrix viewMatrix,
                   Matrix projectionMatrix, int width, int height) {

        Matrix4 viewProjectionMatrix = projectionMatrix * viewMatrix;
        //transform world to clipping coordinates
        point3D = viewProjectionMatrix.multiply(point3D);
        int winX = (int) Math.round((( point3D.getX() + 1 ) / 2.0) *
                                     width );
        //we calculate -point3D.getY() because the screen Y axis is
        //oriented top->down
        int winY = (int) Math.round((( 1 - point3D.getY() ) / 2.0) *
                                     height );
        return new Point2D(winX, winY);
  }

  function Point3D get3dPoint(Point2D point2D, int width,
        int height, Matrix viewMatrix, Matrix projectionMatrix) {

        double x = 2.0 * winX / clientWidth - 1;
        double y = - 2.0 * winY / clientHeight + 1;
        Matrix4 viewProjectionInverse = inverse(projectionMatrix *
             viewMatrix);

        Point3D point3D = new Point3D(x, y, 0);
        return viewProjectionInverse.multiply(point3D);
}